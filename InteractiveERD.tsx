import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export interface ERDEntity {
  name: string;
  fields: string[];
  relationships: string[];
}

export interface ERDDiagram {
  title: string;
  description: string;
  entities: ERDEntity[];
}

interface InteractiveERDProps {
  diagram: ERDDiagram;
}

export function InteractiveERD({ diagram }: InteractiveERDProps) {
  const [expandedEntity, setExpandedEntity] = useState<string | null>(null);

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle>{diagram.title}</CardTitle>
        <CardDescription>{diagram.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {diagram.entities.map((entity) => (
            <div
              key={entity.name}
              className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() =>
                  setExpandedEntity(
                    expandedEntity === entity.name ? null : entity.name
                  )
                }
                className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="font-semibold text-slate-900">
                    {entity.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({entity.fields.length} fields)
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    expandedEntity === entity.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedEntity === entity.name && (
                <div className="px-4 py-3 bg-white border-t border-slate-200">
                  <div className="space-y-4">
                    {entity.fields.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-600 uppercase mb-2">
                          Fields
                        </h4>
                        <ul className="space-y-1">
                          {entity.fields.map((field, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-slate-700 flex items-center gap-2"
                            >
                              <span className="text-slate-400">•</span>
                              <code className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                                {field}
                              </code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entity.relationships.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-600 uppercase mb-2">
                          Relationships
                        </h4>
                        <ul className="space-y-1">
                          {entity.relationships.map((rel, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-slate-700 flex items-center gap-2"
                            >
                              <span className="text-blue-600">→</span>
                              <span>{rel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">💡 Tip:</span> Click on any entity to view its fields and relationships with other entities in the system.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
