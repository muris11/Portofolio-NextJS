import { AdminSectionSkeleton } from "@/components/skeletons";
import { Mail } from "lucide-react";
import type { ContactMessage } from "../hooks/useAdminData";

interface MessagesSectionProps {
  messages: ContactMessage[];
  onDelete: (_id: string) => Promise<boolean>;
  isLoading?: boolean;
}

export function MessagesSection({
  messages,
  onDelete,
  isLoading = false,
}: MessagesSectionProps) {
  const handleDelete = async (id: string) => {
    return await onDelete(id);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {isLoading ? (
        <AdminSectionSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-purple-200 border-4 border-black shadow-neo">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm">
                  <Mail className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">
                    Incoming Messages
                  </h2>
                  <p className="text-gray-700 font-medium text-sm lg:text-base">
                    Manage messages and communications from website visitors
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm font-bold">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                  <span className="text-black uppercase">
                    {messages.length} Messages
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 border-2 border-black rounded-full"></div>
                  <span className="text-black uppercase">
                    {
                      messages.filter(
                        (m) => !m.subject || m.subject === "No Subject"
                      ).length
                    }{" "}
                    No Subject
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Grid/List */}
          {messages.length === 0 ? (
            <div className="neo-card bg-white p-12 text-center border-4 border-black shadow-neo">
              <div className="relative">
                <div className="w-24 h-24 bg-purple-200 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-neo transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Mail className="h-12 w-12 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 border-2 border-black flex items-center justify-center animate-bounce shadow-neo-sm">
                  <svg
                    className="h-4 w-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-black uppercase mb-3">
                No messages yet
              </h3>
              <p className="text-gray-600 font-medium mb-8 max-w-md mx-auto">
                Messages from website visitors will appear here. Wait for the first
                communication!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white border-4 border-black shadow-neo overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b-4 border-black">
                      <tr>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Sender
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Subject
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Message
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Date
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black">
                      {messages.map((message) => (
                        <tr
                          key={message.id}
                          className="hover:bg-purple-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm">
                                <Mail className="h-6 w-6 text-black" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-black text-black uppercase">
                                  {message.name}
                                </div>
                                <div className="text-sm text-gray-600 font-medium truncate">
                                  {message.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <span
                              className={`inline-flex items-center px-2 py-1 border-2 border-black text-xs font-bold shadow-neo-sm uppercase ${
                                message.subject && message.subject !== "No Subject"
                                  ? "bg-purple-200 text-black"
                                  : "bg-gray-200 text-black"
                              }`}
                            >
                              {message.subject || "No Subject"}
                            </span>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="text-sm text-gray-700 font-medium max-w-xs line-clamp-2">
                              {message.message}
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="text-sm font-bold text-black">
                              {new Date(message.createdAt).toLocaleDateString(
                                "id-ID"
                              )}
                            </div>
                            <div className="text-xs text-gray-500 font-medium">
                              {new Date(message.createdAt).toLocaleTimeString(
                                "id-ID",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleDelete(message.id)}
                                className="p-2 bg-red-200 border-2 border-black text-black hover:bg-red-300 shadow-neo-sm hover:shadow-neo transition-all"
                                title="Delete"
                              >
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="neo-card bg-white p-6 border-4 border-black shadow-neo"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm">
                          <Mail className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-black text-black text-lg uppercase">
                            {message.name}
                          </h3>
                          <div className="text-sm text-gray-600 font-medium">
                            {message.email}
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-1 border-2 border-black text-xs font-bold shadow-neo-sm mt-1 uppercase ${
                              message.subject && message.subject !== "No Subject"
                                ? "bg-purple-200 text-black"
                                : "bg-gray-200 text-black"
                            }`}
                          >
                            {message.subject || "No Subject"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="p-2 bg-red-200 border-2 border-black text-black hover:bg-red-300 shadow-neo-sm transition-all"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 mt-4">
                      <p className="text-gray-600 text-sm font-medium line-clamp-3">
                        {message.message}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-bold uppercase">
                          Sent
                        </span>
                        <span className="font-bold text-black">
                          {new Date(message.createdAt).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
