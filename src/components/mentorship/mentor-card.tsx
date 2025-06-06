
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Award, Briefcase, GraduationCap, Info } from "lucide-react"; // Added Info
import { Badge } from "@/components/ui/badge";

// WhatsApp SVG Icon component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.5 10.5A.5.5 0 0 0 16 11v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
    <path d="M12 1a11 11 0 0 0-9.112 15.937L1.17 22.83a.804.804 0 0 0 1.002 1.002l5.893-1.716A11 11 0 1 0 12 1zm0 20a9 9 0 1 1-6.193-2.862l.299.178-4.02 1.174 1.174-4.02.178.299A9 9 0 0 1 12 21z"/>
    <path d="M15.213 14.346a.5.5 0 0 1 .058.654l-.001.001-1.165 1.612a1.07 1.07 0 0 1-1.551.114l-1.83-1.331a5.83 5.83 0 0 1-2.515-.683l-.098-.058a7.11 7.11 0 0 1-2.48-2.145l-.063-.105a.5.5 0 0 1 .16-.668l.696-.504a.5.5 0 0 1 .613-.039l1.24.861a.5.5 0 0 0 .617-.058l.535-.594a.5.5 0 0 1 .638-.05l.001.001a8.45 8.45 0 0 0 2.48 1.092l.107.029a.5.5 0 0 0 .486-.194l.86-1.24a.5.5 0 0 1 .653-.058l.001.001z"/>
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
  bio?: string[]; // Added bio field
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
  bio, // Added bio prop
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
            <WhatsAppIcon className="mr-2 h-4 w-4" /> WhatsApp
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-colors">
          <Link href={`mailto:${contact.email}`}>
            <Mail className="mr-2 h-4 w-4" /> Email
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
