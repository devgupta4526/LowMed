import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { generateBlogPost } from "../utils/geminiService"; // Adjust the import path
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [sections, setSections] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState(null);

  const handleGenerateBlog = async () => {
    if (!topic || !wordCount || !sections) {
      toast.error("Please provide the topic, word count, and number of sections.");
      return;
    }

    setLoading(true);
    toast.success("Generating blog...");
    
    try {
      const blogContent = await generateBlogPost(topic, wordCount, sections);
      setGeneratedBlog(blogContent);
      console.log("Generated Blog Content:", blogContent);
      toast.success("Blog generated successfully!");
    } catch (error) {
      toast.error("Failed to generate blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      <Toaster />
      <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold my-5">Blog Post Generator</h1>
        <div className="flex justify-center items-center">
          <div className="p-6 bg-white rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Generate Your Blog Post</h2>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-1" htmlFor="topic">
                Topic
              </label>
              <input
                id="topic"
                type="text"
                placeholder="Enter the blog topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-1" htmlFor="wordCount">
                Word Count
              </label>
              <input
                id="wordCount"
                type="number"
                placeholder="Enter the target word count"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-1" htmlFor="sections">
                Number of Sections
              </label>
              <input
                id="sections"
                type="number"
                placeholder="Enter the number of sections"
                value={sections}
                onChange={(e) => setSections(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleGenerateBlog}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200 ease-in-out"
            >
              {loading ? "Generating..." : "Generate Blog"}
            </button>
          </div>
        </div>

        {generatedBlog && (
          <div className="mt-10 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Generated Blog:</h2>
            <div className="prose lg:prose-xl">
              <section>
                <h3 className="text-2xl font-semibold">Introduction</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {generatedBlog.introduction || "No introduction provided."}
                </ReactMarkdown>
              </section>

              {generatedBlog.sections?.map((section, index) => (
                <section key={index} className="mb-6">
                  <h3 className="text-2xl font-semibold">{section.heading}</h3>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {section.content}
                  </ReactMarkdown>
                  {/* Render images in each section */}
                  {section.content.match(/\[Image: (.*?)\]\((.*?)\)/g)?.map((image, i) => {
                    const [, description, url] = image.match(/\[Image: (.*?)\]\((.*?)\)/);
                    return (
                      <img 
                        key={i}
                        src={url} 
                        alt={description} 
                        className="w-full rounded-lg my-4" 
                      />
                    );
                  })}
                </section>
              ))}

              <section>
                <h3 className="text-2xl font-semibold">Conclusion</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {generatedBlog.conclusion || "No conclusion provided."}
                </ReactMarkdown>
              </section>

              <section>
                <h3 className="text-2xl font-semibold">Summary</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {generatedBlog.summary || "No summary provided."}
                </ReactMarkdown>
              </section>

              <section>
                <h3 className="text-2xl font-semibold">Call to Action</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {generatedBlog.callToAction || "No call-to-action provided."}
                </ReactMarkdown>
              </section>

              {generatedBlog.images?.map((image, index) => (
                <section key={index}>
                  <h3 className="text-2xl font-semibold">Image {index + 1}</h3>
                  <img 
                    src={image.imageUrl} 
                    alt={`Image ${index + 1}`} 
                    className="w-full rounded-lg my-4" 
                  />
                  <p>Source: {image.source}</p>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGenerator;
