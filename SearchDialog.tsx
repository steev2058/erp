import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchContent, SearchResult } from "@/lib/searchIndex";
import { Search, ChevronRight } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (query.trim()) {
      setResults(searchContent(query));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setQuery("");
  };

  // Group results by category
  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = [];
      }
      acc[result.category].push(result);
      return acc;
    },
    {} as Record<string, SearchResult[]>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search modules, entities, workflows, roles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base"
            autoFocus
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {query.trim() && results.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500">
              <p>No results found for "{query}"</p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500">
              <p>Start typing to search...</p>
            </div>
          ) : (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category}>
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    {category}
                  </p>
                </div>
                {items.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result.path)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-slate-100 transition-colors flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">
                        {result.title}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                        {result.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-slate-200 bg-slate-50 text-xs text-slate-600">
          <p>Press <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-xs">Esc</kbd> to close</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
