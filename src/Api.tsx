/* eslint-disable react-refresh/only-export-components */
"use strict";
interface Track {
  id: string;
  title: string;
  artists: string[];
  duration: number;
  link: string;
  image: Image;
  preview: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

export type { Track };
