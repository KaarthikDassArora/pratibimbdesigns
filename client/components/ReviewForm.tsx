import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Star, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { reviewsApi } from "../lib/api";
import { CreateReviewRequest } from "../../shared/api";

interface ReviewFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ReviewForm({ onSuccess, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Please write your review content");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const reviewData: CreateReviewRequest = {
        rating,
        content: content.trim(),
      };

      await reviewsApi.createReview(reviewData);
      
      setIsSuccess(true);
      toast({
        title: "Review submitted!",
        description: "Your review has been submitted and is pending approval.",
      });

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setRating(5);
        setContent("");
        onSuccess?.();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to submit review. Please try again.");
      toast({
        title: "Error",
        description: err.message || "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setRating(index + 1)}
        className={`p-1 transition-colors ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        } hover:text-yellow-400`}
      >
        <Star className="w-6 h-6 fill-current" />
      </button>
    ));
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-lg font-semibold text-green-600">Thank You!</h3>
            <p className="text-muted-foreground">
              Your review has been submitted successfully and is pending approval.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Share Your Experience</CardTitle>
        <CardDescription className="text-center">
          Help others by sharing your feedback about our services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center space-x-2">
              {renderStars()}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating} out of 5
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Your Review *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience with our services..."
              rows={4}
              required
              minLength={10}
              maxLength={1000}
              className="resize-none"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimum 10 characters</span>
              <span>{content.length}/1000</span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <div className="flex space-x-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim() || content.length < 10}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </div>

          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              Reviews are moderated before being published
            </Badge>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 