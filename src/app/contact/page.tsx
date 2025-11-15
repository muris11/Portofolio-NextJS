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
      newErrors.name = "Nama harus diisi";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Nama maksimal 100 karakter";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Format email tidak valid";
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subjek harus diisi";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subjek minimal 3 karakter";
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = "Subjek maksimal 200 karakter";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Pesan harus diisi";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Pesan minimal 10 karakter";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Pesan maksimal 1000 karakter";
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
        fieldErrors.name = "Nama harus diisi";
      } else if (formData.name.trim().length < 2) {
        fieldErrors.name = "Nama minimal 2 karakter";
      }
    } else if (name === "email") {
      if (!formData.email.trim()) {
        fieldErrors.email = "Email harus diisi";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          fieldErrors.email = "Format email tidak valid";
        }
      }
    } else if (name === "subject") {
      if (!formData.subject.trim()) {
        fieldErrors.subject = "Subjek harus diisi";
      }
    } else if (name === "message") {
      if (!formData.message.trim()) {
        fieldErrors.message = "Pesan harus diisi";
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
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCharacterCount = (field: keyof FormData) => {
    const counts = {
      name: { current: formData.name.length, max: 100 },
      subject: { current: formData.subject.length, max: 200 },
      message: { current: formData.message.length, max: 1000 },
    };
    return counts[field];
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Enhanced Animated Background - Consistent with Homepage */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-32 h-32 border border-cyan-500/20 rotate-12 animate-spin-reverse"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-indigo-500/20 rotate-30 animate-spin-slow animation-delay-3000"></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 border border-sky-500/20 -rotate-45 animate-spin-reverse animation-delay-5000"></div>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2363b3ed' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 backdrop-blur-sm mb-8 animate-scale-in shadow-lg shadow-blue-500/10">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-400 to-cyan-400"></span>
            </span>
            <span className="text-sm font-semibold text-white tracking-wide">
              Let's Connect
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6 animate-slide-in-left tracking-tight">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-slide-in-right animation-delay-300 font-light">
            Ready to bring your ideas to life? Let's discuss your project and
            create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl animate-fade-in-up animation-delay-600">
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                  Send Message
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl backdrop-blur-sm animate-fade-in-up">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-3" />
                    <p className="text-green-200">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm animate-fade-in-up">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                    <p className="text-red-200">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="animate-fade-in-up animation-delay-700">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-white mb-3"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-4 bg-white/5 border rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.name
                        ? "border-red-400/50 bg-red-500/5"
                        : "border-white/20 hover:border-white/30 focus:bg-white/10"
                    }`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && touched.has("name") && (
                    <p className="mt-2 text-sm text-red-400 flex items-center animate-fade-in-up">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="animate-fade-in-up animation-delay-800">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white mb-3"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-4 bg-white/5 border rounded-2xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.email
                        ? "border-red-400/50 bg-red-500/5"
                        : "border-white/20 hover:border-white/30 focus:bg-white/10"
                    }`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.has("email") && (
                    <p className="mt-2 text-sm text-red-400 flex items-center animate-fade-in-up">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subjek <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-20 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors ${
                        errors.subject
                          ? "border-red-500 bg-red-50/50"
                          : "border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400"
                      }`}
                      placeholder="Diskusi Proyek"
                      disabled={isSubmitting}
                    />
                    <span
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
                        formData.subject.length > 180
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.subject.length}/200
                    </span>
                  </div>
                  {errors.subject && touched.has("subject") && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Pesan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      className={`w-full px-4 py-3 pr-20 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-red-500 bg-red-50/50"
                          : "border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400"
                      }`}
                      placeholder="Halo, saya tertarik untuk mendiskusikan..."
                      disabled={isSubmitting}
                    />
                    <span
                      className={`absolute right-3 bottom-3 text-xs ${
                        formData.message.length > 900
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.message.length}/1000
                    </span>
                  </div>
                  {errors.message && touched.has("message") && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Social Links */}
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-lg shadow-sm border border-white/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
                  Media Sosial
                </h2>

                <div className="space-y-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-lg border border-white/10 hover:bg-white/5 backdrop-blur-sm transition-colors"
                  >
                    <Github className="h-6 w-6 text-gray-300" />
                    <div>
                      <p className="font-medium bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        GitHub
                      </p>
                      <p className="text-sm text-gray-400">
                        Lihat proyek dan kode saya
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-lg border border-white/10 hover:bg-white/5 backdrop-blur-sm transition-colors"
                  >
                    <Linkedin className="h-6 w-6 text-blue-400" />
                    <div>
                      <p className="font-medium bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        LinkedIn
                      </p>
                      <p className="text-sm text-gray-400">
                        Hubungi profesional
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-primary/20 p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Waktu Respon</h3>
                <p className="text-gray-300">
                  Saya biasanya merespons pesan dalam 24-48 jam. Untuk keperluan
                  mendesak, silakan sebutkan dalam subjek email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
