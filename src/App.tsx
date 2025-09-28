import React, { useState } from 'react';
import { Camera, Leaf, Shield, QrCode, Upload, CheckCircle, Clock, Users, ArrowRight, Plus, Trash2, Edit3, Package, Truck, Store } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Label } from './components/ui/label';
import { Progress } from './components/ui/progress';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'processing'>('landing');
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [currentBatch, setCurrentBatch] = useState<HerbBatch | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
      {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
      {currentView === 'processing' && (
        <ProcessingTracker 
          onNavigate={setCurrentView} 
          processingSteps={processingSteps}
          setProcessingSteps={setProcessingSteps}
          currentBatch={currentBatch}
          setCurrentBatch={setCurrentBatch}
        />
      )}
    </div>
  );
}

// Types
interface ProcessingStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  stakeholder: string;
  location: string;
  timestamp: Date;
  images: File[];
  aiVerified: boolean;
  verificationScore: number;
  notes: string;
  status: 'pending' | 'in-progress' | 'verified' | 'rejected';
}

interface HerbBatch {
  id: string;
  herbName: string;
  scientificName: string;
  collectionDate: Date;
  collectionLocation: string;
  collectorName: string;
  initialImages: File[];
  totalSteps: number;
  completedSteps: number;
  currentStep: number;
  qrCode?: string;
  finalVerification: boolean;
}

function LandingPage({ onNavigate }: { onNavigate: (view: 'landing' | 'dashboard' | 'processing') => void }) {
  return (
    <>
      {/* Navigation */}
      <nav className="border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">HerbTrace</h1>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => onNavigate('dashboard')} className="bg-primary hover:bg-primary/90">
              Herb Verification
            </Button>
            <Button onClick={() => onNavigate('processing')} variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Processing Tracker
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-secondary/30 to-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            AI-Powered Botanical Herb Tracing
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete traceability from forest collection to consumer sale with AI verification at every step. 
            Ensure authenticity and quality with our advanced botanical tracking system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate('processing')}
              className="bg-primary hover:bg-primary/90 text-lg px-8"
            >
              Start Processing Tracker
            </Button>
            <Button 
              size="lg" 
              onClick={() => onNavigate('dashboard')}
              variant="outline" 
              className="text-lg px-8 border-primary text-primary hover:bg-primary/10"
            >
              Herb Verification
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Complete Traceability Solution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Camera className="h-8 w-8 text-primary" />}
              title="AI Herb Verification"
              description="Upload images for instant AI-powered verification of herb quality and authenticity at collection point"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Supply Chain Tracking"
              description="Track herbs through every step from forest collection to processing and final sale"
            />
            <FeatureCard
              icon={<QrCode className="h-8 w-8 text-primary" />}
              title="QR Code Certification"
              description="Generate QR codes for final products showing complete processing history and authenticity"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Multi-Stakeholder Platform"
              description="Connect collectors, processors, distributors, and consumers in one unified platform"
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-primary" />}
              title="Quality Assurance"
              description="AI-powered quality checks ensure only the best herbs make it through the supply chain"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="Real-time Updates"
              description="Get instant updates on processing status and location throughout the supply chain"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            How HerbTrace Works
          </h3>
          <div className="space-y-8">
            <ProcessStep
              step="1"
              title="Forest Collection"
              description="Collectors upload images of herbs for AI verification before harvesting. Only verified herbs are approved for collection."
              icon={<Leaf className="h-6 w-6" />}
            />
            <ProcessStep
              step="2"
              title="Processing & Verification"
              description="Each processing step is documented with AI verification, creating an immutable record of the herb's journey."
              icon={<Shield className="h-6 w-6" />}
            />
            <ProcessStep
              step="3"
              title="Final Certification"
              description="Ready products receive a QR code containing the complete processing history and authenticity certificate."
              icon={<QrCode className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-primary">HerbTrace</span>
          </div>
          <p className="text-muted-foreground">
            Ensuring botanical authenticity from forest to consumer
          </p>
        </div>
      </footer>
    </>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (view: 'landing' | 'dashboard' | 'processing') => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'verified' | 'rejected' | null>(null);
  const [herbInfo, setHerbInfo] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVerificationStatus('pending');
    }
  };

  const handleVerification = () => {
    if (!selectedFile) return;
    
    setVerificationStatus('verifying');
    
    // Simulate AI verification process
    setTimeout(() => {
      setVerificationStatus('verified');
      setHerbInfo({
        name: 'Tulsi (Holy Basil)',
        scientificName: 'Ocimum tenuiflorum',
        quality: 'Premium',
        confidence: 94,
        recommendations: [
          'Harvest during morning hours for optimal potency',
          'Ensure leaves are fully mature',
          'Store in dry, ventilated area'
        ]
      });
    }, 3000);
  };

  return (
    <>
      {/* Dashboard Header */}
      <nav className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">HerbTrace</h1>
            <Badge variant="secondary" className="ml-2">Dashboard</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('processing')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Processing Tracker
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('landing')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Home
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Profile
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Herb Verification</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {!selectedFile ? (
                    <div>
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Upload Herb Image</h3>
                      <p className="text-muted-foreground mb-4">
                        Upload a clear image of the herb for AI verification
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="herb-upload"
                      />
                      <label htmlFor="herb-upload">
                        <Button asChild className="cursor-pointer">
                          <span>Choose Image</span>
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <div className="relative mb-4">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Uploaded herb"
                          className="max-w-full h-48 object-cover mx-auto rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {selectedFile.name}
                      </p>
                      {verificationStatus === 'pending' && (
                        <Button onClick={handleVerification} className="bg-primary hover:bg-primary/90">
                          Start AI Verification
                        </Button>
                      )}
                      {verificationStatus === 'verifying' && (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span>AI Analyzing...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Verification Results */}
            {verificationStatus === 'verified' && herbInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Verification Complete</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Identified Herb</h4>
                      <p className="text-lg">{herbInfo.name}</p>
                      <p className="text-sm text-muted-foreground">{herbInfo.scientificName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold">Quality Grade</h4>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {herbInfo.quality}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold">AI Confidence</h4>
                        <p className="text-lg font-semibold text-green-600">{herbInfo.confidence}%</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Recommendations</h4>
                      <ul className="space-y-1 text-sm">
                        {herbInfo.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">
                        Approve for Collection
                      </Button>
                      <Button 
                        onClick={() => onNavigate('processing')}
                        variant="outline" 
                        className="flex-1 border-primary text-primary hover:bg-primary/10"
                      >
                        Start Processing
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verified</span>
                    <span className="font-semibold text-green-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-semibold text-yellow-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rejected</span>
                    <span className="font-semibold text-red-600">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Ashwagandha</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Neem</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Turmeric</p>
                      <p className="text-xs text-muted-foreground">30 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5" />
                  <span>QR Generator</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate QR codes for verified products
                </p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h4 className="text-xl font-semibold mb-2 text-foreground">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ProcessStep({ step, title, description, icon }: { step: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold">
          {step}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          {icon}
          <h4 className="text-xl font-semibold text-foreground">{title}</h4>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ProcessingTracker({ 
  onNavigate, 
  processingSteps, 
  setProcessingSteps, 
  currentBatch, 
  setCurrentBatch 
}: { 
  onNavigate: (view: 'landing' | 'dashboard' | 'processing') => void;
  processingSteps: ProcessingStep[];
  setProcessingSteps: React.Dispatch<React.SetStateAction<ProcessingStep[]>>;
  currentBatch: HerbBatch | null;
  setCurrentBatch: React.Dispatch<React.SetStateAction<HerbBatch | null>>;
}) {
  const [showAddStep, setShowAddStep] = useState(false);
  const [newStep, setNewStep] = useState<Partial<ProcessingStep>>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const stakeholderTypes = [
    'Collector',
    'Primary Processor',
    'Secondary Processor', 
    'Quality Controller',
    'Packager',
    'Distributor',
    'Wholesaler',
    'Retailer'
  ];

  const addProcessingStep = () => {
    if (!newStep.title || !newStep.stakeholder || !newStep.description) return;

    const step: ProcessingStep = {
      id: `step-${Date.now()}`,
      stepNumber: processingSteps.length + 1,
      title: newStep.title!,
      description: newStep.description!,
      stakeholder: newStep.stakeholder!,
      location: newStep.location || '',
      timestamp: new Date(),
      images: selectedFiles,
      aiVerified: false,
      verificationScore: 0,
      notes: newStep.notes || '',
      status: 'pending'
    };

    setProcessingSteps([...processingSteps, step]);
    setNewStep({});
    setSelectedFiles([]);
    setShowAddStep(false);

    // Simulate AI verification
    setTimeout(() => {
      setProcessingSteps(prev => prev.map(s => 
        s.id === step.id 
          ? { ...s, aiVerified: true, verificationScore: 85 + Math.floor(Math.random() * 15), status: 'verified' }
          : s
      ));
    }, 2000);
  };

  const initializeBatch = () => {
    if (!currentBatch) {
      setCurrentBatch({
        id: `batch-${Date.now()}`,
        herbName: 'Tulsi (Holy Basil)',
        scientificName: 'Ocimum tenuiflorum',
        collectionDate: new Date(),
        collectionLocation: 'Himalayan Foothills',
        collectorName: 'Rajesh Kumar',
        initialImages: [],
        totalSteps: 8,
        completedSteps: processingSteps.filter(s => s.status === 'verified').length,
        currentStep: processingSteps.length,
        finalVerification: false
      });
    }
  };

  const generateQRCode = () => {
    if (currentBatch && processingSteps.length >= 5) {
      setCurrentBatch({
        ...currentBatch,
        qrCode: `QR-${currentBatch.id}`,
        finalVerification: true
      });
    }
  };

  React.useEffect(() => {
    initializeBatch();
  }, []);

  return (
    <>
      {/* Header */}
      <nav className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Processing Tracker</h1>
            <Badge variant="secondary" className="ml-2">Multi-Step Verification</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('dashboard')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Herb Verification
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('landing')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Batch Overview */}
            {currentBatch && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Batch Overview</span>
                    <Badge variant="outline">{currentBatch.id}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Herb Type</Label>
                      <p className="text-lg font-semibold">{currentBatch.herbName}</p>
                      <p className="text-sm text-muted-foreground">{currentBatch.scientificName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Collection Info</Label>
                      <p className="text-sm">{currentBatch.collectorName}</p>
                      <p className="text-sm text-muted-foreground">{currentBatch.collectionLocation}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Progress</Label>
                      <div className="flex items-center space-x-2">
                        <Progress value={(processingSteps.filter(s => s.status === 'verified').length / 8) * 100} className="flex-1" />
                        <span className="text-sm font-medium">
                          {processingSteps.filter(s => s.status === 'verified').length}/8
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Processing Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Processing Steps</span>
                  <Dialog open={showAddStep} onOpenChange={setShowAddStep}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Step
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Processing Step</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Step Title</Label>
                            <Input 
                              id="title"
                              placeholder="e.g. Drying Process"
                              value={newStep.title || ''}
                              onChange={(e) => setNewStep({...newStep, title: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="stakeholder">Stakeholder</Label>
                            <Select value={newStep.stakeholder} onValueChange={(value) => setNewStep({...newStep, stakeholder: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select stakeholder" />
                              </SelectTrigger>
                              <SelectContent>
                                {stakeholderTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location"
                            placeholder="Processing facility location"
                            value={newStep.location || ''}
                            onChange={(e) => setNewStep({...newStep, location: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description"
                            placeholder="Describe the processing step in detail..."
                            value={newStep.description || ''}
                            onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea 
                            id="notes"
                            placeholder="Any additional notes or observations..."
                            value={newStep.notes || ''}
                            onChange={(e) => setNewStep({...newStep, notes: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Upload Images</Label>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                            className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          />
                          {selectedFiles.length > 0 && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {selectedFiles.length} file(s) selected
                            </p>
                          )}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowAddStep(false)}>
                            Cancel
                          </Button>
                          <Button onClick={addProcessingStep} className="bg-primary hover:bg-primary/90">
                            Add Step
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {processingSteps.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Processing Steps Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by adding the first processing step from collection to consumer
                    </p>
                    <Button onClick={() => setShowAddStep(true)} className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Step
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {processingSteps.map((step, index) => (
                      <div key={step.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                step.status === 'verified' ? 'bg-green-100 text-green-800' :
                                step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                step.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {step.stepNumber}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold">{step.title}</h4>
                                <Badge variant="outline">{step.stakeholder}</Badge>
                                {step.status === 'verified' && (
                                  <Badge variant="default" className="bg-green-100 text-green-800">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    AI Verified ({step.verificationScore}%)
                                  </Badge>
                                )}
                                {step.status === 'pending' && (
                                  <Badge variant="outline">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                              {step.location && (
                                <p className="text-xs text-muted-foreground">📍 {step.location}</p>
                              )}
                              {step.notes && (
                                <p className="text-xs text-muted-foreground mt-1">📝 {step.notes}</p>
                              )}
                              <p className="text-xs text-muted-foreground mt-2">
                                {step.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {step.images.length > 0 && (
                              <Badge variant="secondary">
                                📸 {step.images.length} image(s)
                              </Badge>
                            )}
                          </div>
                        </div>
                        {index < processingSteps.length - 1 && (
                          <div className="flex justify-center mt-4">
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verified Steps</span>
                    <span className="font-semibold text-green-600">
                      {processingSteps.filter(s => s.status === 'verified').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending Steps</span>
                    <span className="font-semibold text-yellow-600">
                      {processingSteps.filter(s => s.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Steps</span>
                    <span className="font-semibold">{processingSteps.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stakeholder Types */}
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Actors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stakeholderTypes.map((type, index) => {
                    const hasStep = processingSteps.some(s => s.stakeholder === type);
                    return (
                      <div key={type} className={`flex items-center space-x-2 p-2 rounded ${
                        hasStep ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'
                      }`}>
                        {hasStep ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                        <span className="text-sm">{type}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* QR Code Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5" />
                  <span>Final Certification</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Generate QR code when processing is complete (minimum 5 steps required)
                  </p>
                  {processingSteps.filter(s => s.status === 'verified').length >= 5 ? (
                    currentBatch?.qrCode ? (
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <QrCode className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        <p className="font-semibold text-green-800">QR Code Generated!</p>
                        <p className="text-xs text-green-600 mt-1">{currentBatch.qrCode}</p>
                        <Badge className="bg-green-100 text-green-800 mt-2">
                          Certified Authentic
                        </Badge>
                      </div>
                    ) : (
                      <Button 
                        onClick={generateQRCode}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Generate QR Code
                      </Button>
                    )
                  ) : (
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Need {5 - processingSteps.filter(s => s.status === 'verified').length} more verified steps
                      </p>
                      <Progress 
                        value={(processingSteps.filter(s => s.status === 'verified').length / 5) * 100} 
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;