"use client";

import {
    AlertCircle,
    CheckCircle2,
    Github,
    Linkedin,
    Send,
} from "lucide-react";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = "Subject must be less than 200 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (touched.has(name)) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => new Set(prev).add(name));

    // Validate this field on blur
    const fieldErrors: FormErrors = {};

    if (name === "name") {
      if (!formData.name.trim()) {
        fieldErrors.name = "Name is required";
      } else if (formData.name.trim().length < 2) {
        fieldErrors.name = "Name must be at least 2 characters";
      }
    } else if (name === "email") {
      if (!formData.email.trim()) {
        fieldErrors.email = "Email is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          fieldErrors.email = "Invalid email format";
        }
      }
    } else if (name === "subject") {
      if (!formData.subject.trim()) {
        fieldErrors.subject = "Subject is required";
      }
    } else if (name === "message") {
      if (!formData.message.trim()) {
        fieldErrors.message = "Message is required";
      }
    }

    setErrors((prev) => ({
      ...prev,
      ...fieldErrors,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        setTouched(new Set());
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-canvas text-black overflow-x-hidden">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform -rotate-2">
            <span className="font-bold uppercase tracking-widest text-sm">
              Let&apos;s Connect
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
            Get In Touch
          </h1>
          <p className="text-xl font-medium max-w-2xl mx-auto border-l-4 border-black pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            Ready to bring your ideas to life? Let&apos;s discuss your project
            and collaborate.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="neo-card p-8 lg:p-10 bg-white">
              <div className="mb-8">
                <h2 className="text-3xl font-black uppercase mb-4">
                  Send Message
                </h2>
                <p className="font-medium">
                  Fill out the form below and I&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-100 border-4 border-black shadow-neo-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-6 w-6 text-black mr-3" />
                    <p className="font-bold">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-100 border-4 border-black shadow-neo-sm">
                  <div className="flex items-center">
                    <AlertCircle className="h-6 w-6 text-black mr-3" />
                    <p className="font-bold">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-white border-4 border-black focus:outline-none focus:shadow-neo transition-all font-medium placeholder-gray-500 ${
                      errors.name ? "bg-red-50" : ""
                    }`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && touched.has("name") && (
                    <p className="mt-2 text-sm font-bold text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-white border-4 border-black focus:outline-none focus:shadow-neo transition-all font-medium placeholder-gray-500 ${
                      errors.email ? "bg-red-50" : ""
                    }`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.has("email") && (
                    <p className="mt-2 text-sm font-bold text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-20 bg-white border-4 border-black focus:outline-none focus:shadow-neo transition-all font-medium placeholder-gray-500 ${
                        errors.subject ? "bg-red-50" : ""
                      }`}
                      placeholder="Project Discussion"
                      disabled={isSubmitting}
                    />
                    <span
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-bold ${
                        formData.subject.length > 180
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.subject.length}/200
                    </span>
                  </div>
                  {errors.subject && touched.has("subject") && (
                    <p className="mt-2 text-sm font-bold text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Message <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      className={`w-full px-4 py-3 pr-20 bg-white border-4 border-black focus:outline-none focus:shadow-neo transition-all font-medium placeholder-gray-500 resize-none ${
                        errors.message ? "bg-red-50" : ""
                      }`}
                      placeholder="Hello, I'm interested in discussing..."
                      disabled={isSubmitting}
                    />
                    <span
                      className={`absolute right-3 bottom-3 text-xs font-bold ${
                        formData.message.length > 900
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.message.length}/1000
                    </span>
                  </div>
                  {errors.message && touched.has("message") && (
                    <p className="mt-2 text-sm font-bold text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="neo-btn w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-neo"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-4 border-black border-t-transparent"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Social Links */}
              <div className="neo-card p-8 bg-white">
                <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2 inline-block">
                  Social Media
                </h2>

                <div className="space-y-4">
                  <a
                    href="https://github.com/muris11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 border-4 border-black hover:bg-neo-secondary hover:shadow-neo transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <Github className="h-8 w-8" />
                    <div>
                      <p className="font-bold uppercase">GitHub</p>
                      <p className="text-sm font-medium">
                        View my projects and code
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/rifqy-saputra-022236261/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 border-4 border-black hover:bg-blue-400 hover:shadow-neo transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <Linkedin className="h-8 w-8" />
                    <div>
                      <p className="font-bold uppercase">LinkedIn</p>
                      <p className="text-sm font-medium">
                        Connect professionally
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-neo-secondary border-4 border-black p-6 shadow-neo">
                <h3 className="font-black uppercase mb-2 text-lg">
                  Response Time
                </h3>
                <p className="font-medium">
                  I usually respond to messages within 24-48 hours. For urgent
                  matters, please mention it in the email subject.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
