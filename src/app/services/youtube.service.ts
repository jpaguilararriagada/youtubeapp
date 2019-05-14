import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { pipe } from "@angular/core/src/render3";

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  private youtubeUrl = "https://www.googleapis.com/youtube/v3";
  private apiKey = "AIzaSyCvuXDqO_NHbcrHXt-fFrLN3G0klqF_pBQ";
  private chanelId = "UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken: string;
  constructor(public http: HttpClient) {}

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();
    params = params.append("part", "snippet");
    params = params.append("maxResults", "10");
    params = params.append("playlistId", this.chanelId);
    params = params.append("key", this.apiKey);

    if (this.nextPageToken) {
      params = params.append("pageToken", this.nextPageToken);
    }

    return this.http.get(url, { params }).pipe(
      map((res: any) => {
        console.log(res);
        this.nextPageToken = res.nextPageToken;
        const videos: any[] = [];
        for (const video of res.items) {
          const snippet = video.snippet;
          videos.push(snippet);
        }
        return videos;
      })
    );
  }
}
