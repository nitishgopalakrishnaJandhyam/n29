import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  topicSummary = `Recent innovations in generative AI are reshaping multiple domains. Image-generation models like DALL-E 2 and Imagen are advancing toward creating highly realistic and conceptually rich visuals, enhancing their use in digital art and media. Multi-modal models, integrating text, audio, and visual inputs, are revolutionizing human-AI interaction, allowing seamless communication across formats. Speech synthesis is becoming more nuanced, enabling lifelike voice cloning for applications like audiobooks and personalized audio content. Generative AI is also impacting music creation, as tools like MusicLM and AudioCraft produce copyright-free compositions, while advancements in cybersecurity and education further demonstrate AI's transformative potential. For further details, you can explore these resources:`;

  techDetails = `This app uses Angular for the frontend, Node.js for the backend, and MySQL as the database. It is hosted on a free database and utilizes JWT for user authentication. The app is structured as a Single Page Application (SPA), providing a smooth user experience without reloading the page. The backend communicates with the frontend through HTTP requests, and the data is visualized using dynamic charts.`;
}
