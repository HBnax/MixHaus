"use client"
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function DrinkGrid(){
    const [searchQuery, setSearchQuery] = useState("");
    
    const searchDrinks = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle search logic here
        console.log("Searching for:", searchQuery);
    }
}