import { useState, useRef } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface UploadPageProps {
  onUploadComplete: () => void;
}

export default function UploadPage({ onUploadComplete }: UploadPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      setTimeout(() => {
        onUploadComplete();
      }, 500);
    }, 2500);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {!isUploading ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">
              Upload Your Legal Document
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Support for PDF and DOCX files up to 10MB
            </p>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-blue-900 bg-blue-50 scale-105'
                  : selectedFile
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-blue-900 hover:bg-blue-50'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile ? (
                <div className="space-y-4">
                  <FileText className="h-16 w-16 text-green-500 mx-auto" />
                  <p className="text-lg font-semibold text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-16 w-16 text-blue-900 mx-auto" />
                  <p className="text-lg font-semibold text-gray-900">
                    Drop your document here or click to browse
                  </p>
                  <p className="text-sm text-gray-600">PDF or DOCX files only</p>
                </div>
              )}
            </div>

            {selectedFile && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleUpload}
                  className="px-8 py-4 bg-blue-900 text-white rounded-2xl font-semibold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Analyze Document
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="space-y-6 text-center">
              <Loader2 className="h-16 w-16 text-blue-900 mx-auto animate-spin" />
              <h3 className="text-2xl font-bold text-blue-900">
                Analyzing your document securely...
              </h3>
              <p className="text-gray-600">
                Our AI is reading through your document and extracting key insights
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-900 h-full transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
