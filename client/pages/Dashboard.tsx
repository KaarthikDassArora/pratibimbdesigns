import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { postsApi, healthApi } from "../lib/api";
import { Post } from "../../shared/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Heart, 
  MessageCircle, 
  Calendar,
  Activity,
  Database,
  Server,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHealthLoading, setIsHealthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // New post form state
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    published: false,
  });

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
    checkHealth();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const response = await postsApi.getPosts();
      if (response.data?.posts) {
        // Filter posts to only those created by the logged-in user
        setPosts(response.data.posts.filter(post => post.authorId === user?.id));
      } else {
        setPosts([]);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load posts",
        variant: "destructive",
      });
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const checkHealth = async () => {
    setIsHealthLoading(true);
    try {
      const response = await healthApi.check();
      setHealthStatus(response);
    } catch (error: any) {
      setHealthStatus({ success: false, message: error.message });
    } finally {
      setIsHealthLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await postsApi.createPost(newPost);
      if (response.data?.post) {
        setPosts([response.data.post, ...posts]);
        setNewPost({ title: "", content: "", published: false });
        toast({
          title: "Success",
          description: "Post created successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await postsApi.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p>Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user.firstName || user.username}!
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="api">API Status</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{posts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Your published content
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Active</div>
                  <p className="text-xs text-muted-foreground">
                    {user.role} account
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setActiveTab("posts")}
                    className="justify-start"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Post
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab("profile")}
                    className="justify-start"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
                <CardDescription>
                  Add a new post to your blog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Write your post content..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={!newPost.title || !newPost.content}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Posts</CardTitle>
                <CardDescription>
                  Manage your published posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No posts yet. Create your first post above!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {post.content.substring(0, 100)}...
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant={post.published ? "default" : "secondary"}>
                                {post.published ? "Published" : "Draft"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <Label>Username</Label>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                  <div>
                    <Label>First Name</Label>
                    <p className="text-sm text-muted-foreground">
                      {user.firstName || "Not set"}
                    </p>
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <p className="text-sm text-muted-foreground">
                      {user.lastName || "Not set"}
                    </p>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Badge variant="outline">{user.role}</Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Status Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Backend API Status</CardTitle>
                <CardDescription>
                  Monitor the health and status of backend services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Server className="w-4 h-4" />
                      <span>API Health Check</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={checkHealth}
                      disabled={isHealthLoading}
                    >
                      {isHealthLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Activity className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {healthStatus && (
                    <Alert variant={healthStatus.success ? "default" : "destructive"}>
                      {healthStatus.success ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>
                        {healthStatus.success ? (
                          <div>
                            <p className="font-medium">API is healthy</p>
                            <p className="text-sm text-muted-foreground">
                              Environment: {healthStatus.environment} | 
                              Timestamp: {new Date(healthStatus.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">API is not responding</p>
                            <p className="text-sm text-muted-foreground">
                              {healthStatus.message}
                            </p>
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium">Available Endpoints</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-xs">/api/health</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">POST</Badge>
                        <code className="text-xs">/api/auth/login</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">POST</Badge>
                        <code className="text-xs">/api/auth/register</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-xs">/api/auth/me</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-xs">/api/posts</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">POST</Badge>
                        <code className="text-xs">/api/posts</code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 