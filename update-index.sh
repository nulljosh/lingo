#!/bin/bash

# This script shows what changes to make to index.html
# We need to update the categories object and add the new questions

echo "Updates needed for index.html:"
echo "1. Add Programming tab to categories"
echo "2. Add all programming language subjects (JS, Python, Rust, etc.)"
echo "3. Add expanded science subjects (Physics, Chemistry, Biology)"
echo "4. Add music subcategories (Theory, History)" 
echo "5. Add more math subjects (Trig, Linear Algebra)"
echo "6. Merge all new questions from expand-questions.js"

echo ""
echo "New category structure:"
cat << 'CATEGORIES'
categories: {
    languages: { ... existing ... },
    programming: {
        title: 'Choose a programming language',
        subjects: [
            { id: 'javascript', name: 'JavaScript', icon: '🟨', level: 'Web Development' },
            { id: 'python', name: 'Python', icon: '🐍', level: 'General Purpose' },
            { id: 'rust', name: 'Rust', icon: '🦀', level: 'Systems Programming' },
            { id: 'cpp', name: 'C++', icon: '⚙️', level: 'Systems & Games' },
            { id: 'java', name: 'Java', icon: '☕', level: 'Enterprise & Android' },
            { id: 'go', name: 'Go', icon: '🐹', level: 'Cloud & DevOps' },
            { id: 'sql', name: 'SQL', icon: '🗃️', level: 'Database Queries' }
        ]
    },
    math: {
        title: 'Choose a math topic',
        subjects: [
            { id: 'arithmetic', name: 'Arithmetic', icon: '➕', level: 'Basic Math' },
            { id: 'algebra', name: 'Algebra', icon: '𝑥²', level: 'Equations & Variables' },
            { id: 'geometry', name: 'Geometry', icon: '📐', level: 'Shapes & Angles' },
            { id: 'trigonometry', name: 'Trigonometry', icon: '📈', level: 'Sine, Cosine, Tangent' },
            { id: 'calculus', name: 'Calculus', icon: '∫', level: 'Derivatives & Integrals' },
            { id: 'statistics', name: 'Statistics', icon: '📊', level: 'Data Analysis' },
            { id: 'linear_algebra', name: 'Linear Algebra', icon: '⊡', level: 'Matrices & Vectors' },
            { id: 'logic', name: 'Logic', icon: '🧩', level: 'Puzzles & Reasoning' }
        ]
    },
    science: {
        title: 'Choose a science topic',
        subjects: [
            { id: 'physics', name: 'Physics', icon: '⚛️', level: 'Forces & Energy' },
            { id: 'chemistry', name: 'Chemistry', icon: '🧪', level: 'Elements & Reactions' },
            { id: 'biology', name: 'Biology', icon: '🧬', level: 'Life Sciences' },
            { id: 'astronomy', name: 'Astronomy', icon: '🔭', level: 'Space & Cosmos' },
            { id: 'earth_science', name: 'Earth Science', icon: '🌍', level: 'Geology & Climate' }
        ]
    },
    skills: {
        title: 'Choose a skill',
        subjects: [
            { id: 'chess', name: 'Chess', icon: '♟️', level: 'Strategy & Tactics' },
            { id: 'music_theory', name: 'Music Theory', icon: '🎵', level: 'Notes & Chords' },
            { id: 'music_history', name: 'Music History', icon: '🎸', level: 'Genres & Artists' },
            { id: 'world_history', name: 'World History', icon: '📚', level: 'Events & Civilizations' },
            { id: 'geography', name: 'Geography', icon: '🗺️', level: 'Countries & Capitals' },
            { id: 'art_history', name: 'Art History', icon: '🎨', level: 'Movements & Artists' }
        ]
    }
}
CATEGORIES
