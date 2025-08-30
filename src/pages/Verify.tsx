import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Eye, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function Verify() {
  const [files, setFiles] = useState<File[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [ocrData, setOcrData] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // Simulate OCR extraction
    setTimeout(() => {
      setOcrData({
        studentName: "Rahul Kumar Sharma",
        rollNumber: "CSE2019001",
        course: "Bachelor of Technology - Computer Science",
        institution: "Indian Institute of Technology Delhi", 
        certificateId: "IIT-CSE-2023-001247",
        issueDate: "2023-06-15",
        grade: "First Class with Distinction"
      });
    }, 1500);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  const handleVerify = async () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationResult({
        status: 'verified',
        confidence: 98.7,
        verificationId: 'VER-2024-001247',
        timestamp: new Date(),
        aiAnalysis: {
          sealAuthenticity: 99.2,
          signatureMatch: 97.8,
          formatConsistency: 98.9,
          photoTampering: 0.1
        }
      });
      setIsVerifying(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Certificate Verification Portal</h1>
          <p className="text-xl text-muted-foreground">
            Upload your academic certificate for instant AI-powered authenticity verification
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Certificate
              </GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                  isDragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                {isDragActive ? (
                  <p className="text-primary">Drop the certificate here...</p>
                ) : (
                  <div>
                    <p className="text-lg font-medium mb-2">
                      Drag & drop your certificate here
                    </p>
                    <p className="text-muted-foreground mb-4">
                      or click to select files
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, JPEG, PNG (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {files.length > 0 && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">{files[0].name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(files[0].size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {ocrData && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Extracted Information
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-muted-foreground">Student Name</label>
                        <Input value={ocrData.studentName} readOnly />
                      </div>
                      <div>
                        <label className="text-muted-foreground">Roll Number</label>
                        <Input value={ocrData.rollNumber} readOnly />
                      </div>
                      <div>
                        <label className="text-muted-foreground">Course</label>
                        <Input value={ocrData.course} readOnly />
                      </div>
                      <div>
                        <label className="text-muted-foreground">Certificate ID</label>
                        <Input value={ocrData.certificateId} readOnly />
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="w-full mt-6"
                    size="lg"
                  >
                    {isVerifying ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Verifying Certificate...
                      </div>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Verify Certificate
                      </>
                    )}
                  </Button>
                </div>
              )}
            </GlassCardContent>
          </GlassCard>

          {/* Results Section */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Verification Results
              </GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              {verificationResult ? (
                <div className="space-y-6">
                  {/* Status */}
                  <div className="text-center py-6">
                    <VerificationBadge 
                      status={verificationResult.status}
                      className="text-lg px-4 py-2"
                    />
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-verified">
                        {verificationResult.confidence}%
                      </div>
                      <div className="text-muted-foreground">Confidence Score</div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">AI Analysis Results</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Seal Authenticity</span>
                        <span className="font-medium text-verified">
                          {verificationResult.aiAnalysis.sealAuthenticity}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Signature Match</span>
                        <span className="font-medium text-verified">
                          {verificationResult.aiAnalysis.signatureMatch}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Format Consistency</span>
                        <span className="font-medium text-verified">
                          {verificationResult.aiAnalysis.formatConsistency}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Photo Tampering</span>
                        <span className="font-medium text-verified">
                          {verificationResult.aiAnalysis.photoTampering}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Details */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Verification ID:</span>{" "}
                      <span className="font-mono">{verificationResult.verificationId}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Verified at:</span>{" "}
                      {verificationResult.timestamp.toLocaleString()}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Verification Report
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                  <p>Upload a certificate to begin verification</p>
                </div>
              )}
            </GlassCardContent>
          </GlassCard>
        </div>

        {/* Features Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Advanced algorithms analyze seals, signatures, and formatting for authentic verification.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Instant Results</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Get verification results in seconds with detailed confidence scores and analysis.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Your documents are processed securely and never stored on our servers.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}