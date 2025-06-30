import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { reviewsApi } from "../lib/api";
import { Review } from "../../shared/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Plus, 
  User, 
  Calendar,
  MessageCircle,
  Loader2,
  ThumbsUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReviewForm from "../components/ReviewForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export default function Reviews() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    loadReviews();
    if (isAuthenticated) {
      loadMyReview();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const response = await reviewsApi.getReviews();
      if (response.data?.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error: any) {
      if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))){
        toast({
          title: "Cannot connect to backend",
          description: "Please check your internet connection or if the backend server is running.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to load reviews",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMyReview = async () => {
    try {
      const response = await reviewsApi.getMyReviews();
      if (response.data?.reviews && response.data.reviews.length > 0) {
        setMyReview(response.data.reviews[0]);
      }
    } catch (error: any) {
      console.error("Failed to load my review:", error);
    }
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    loadMyReview();
    loadReviews();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Customer Reviews</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our clients have to say about their experience with our services
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{getAverageRating()}</div>
                <div className="flex justify-center mt-1">
                  {renderStars(Math.round(parseFloat(getAverageRating())))}
                </div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{reviews.length}</div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>
            </div>

            {/* Add Review Button */}
            {isAuthenticated && !myReview && (
              <Button
                onClick={() => setShowReviewForm(true)}
                className="mt-6"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your Review
              </Button>
            )}

            {isAuthenticated && myReview && (
              <div className="mt-6">
                <Badge variant={myReview.isApproved ? "default" : "secondary"}>
                  {myReview.isApproved ? "Your review is published" : "Your review is pending approval"}
                </Badge>
              </div>
            )}

            {!isAuthenticated && (
              <div className="mt-6">
                <p className="text-muted-foreground">
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  <Link to="/login" className="underline hover:text-primary">Sign in</Link> to leave a review
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="container mx-auto px-4 py-8">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <ThumbsUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">
              Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="glass border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {review.author?.firstName && review.author?.lastName
                            ? `${review.author.firstName} ${review.author.lastName}`
                            : review.author?.username || "Anonymous"}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-muted-foreground">
                            {review.rating} out of 5
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Review Form Dialog */}
      <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Experience</DialogTitle>
          </DialogHeader>
          <ReviewForm
            onSuccess={handleReviewSuccess}
            onCancel={() => setShowReviewForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
