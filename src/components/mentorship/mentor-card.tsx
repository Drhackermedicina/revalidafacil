
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, GraduationCap, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// WhatsApp SVG Icon component (Standard Green WhatsApp Icon)
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#25D366" // WhatsApp Green
    width="24"
    height="24"
    {...props}
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.204-1.634a11.86 11.86 0 005.79 1.498h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-2.893-6.994z"/>
  </svg>
);

// Gmail SVG Icon component
const GmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    {...props}
  >
    <title>Gmail</title>
    <path
      d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H1.5C.649 21 0 20.35 0 19.5v-15C0 3.65.649 3 1.5 3h21C23.35 3 24 3.65 24 4.5zM12 12.75L2.25 6.469V18h19.5V6.469L12 12.75zM3.164 4.5l8.836 6.094L20.836 4.5H3.164z"
      fill="#EA4335" // Gmail Red for the M shape, approximating overall feel
    />
    {/* Simplified: For a full colored Gmail icon, more paths for blue, green, yellow would be needed */}
    {/* This SVG provides the main 'M' shape envelope in red */}
  </svg>
);


export interface MentorProps {
  name: string;
  photoUrl: string;
  photoAiHint?: string;
  contact: {
    phone: string;
    whatsappLink: string;
    email: string;
  };
  education: string;
  graduationYear: string;
  experience: string[];
  specialties?: string[];
  bio?: string[];
}

export default function MentorCard({
  name,
  photoUrl,
  photoAiHint,
  contact,
  education,
  graduationYear,
  experience,
  specialties,
  bio,
}: MentorProps) {
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card">
      <CardHeader className="flex flex-col items-center text-center p-6 border-b">
        <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
          <AvatarImage src={photoUrl} alt={name} data-ai-hint={photoAiHint || "profile doctor"} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl font-bold text-primary">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4 flex-grow">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" /> Formação
          </h4>
          <p className="text-sm">{education} ({graduationYear})</p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center">
            <Briefcase className="mr-2 h-4 w-4" /> Experiência
          </h4>
          <ul className="list-disc list-inside text-sm space-y-0.5">
            {experience.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ul>
        </div>

        {specialties && specialties.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center">
              <Award className="mr-2 h-4 w-4" /> Especialidades da Mentoria
            </h4>
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec, index) => (
                <Badge key={index} variant="secondary">{spec}</Badge>
              ))}
            </div>
          </div>
        )}

        {bio && bio.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center">
              <Info className="mr-2 h-4 w-4" /> Sobre
            </h4>
            <ul className="list-disc list-inside text-sm space-y-0.5">
              {bio.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 border-t flex flex-col sm:flex-row sm:justify-between gap-2 bg-muted/50">
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto hover:bg-green-500 hover:text-white hover:border-green-500 transition-colors">
          <Link href={contact.whatsappLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors">
          <Link href={`mailto:${contact.email}`}>
            <GmailIcon className="mr-2 h-4 w-4" /> Email
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
