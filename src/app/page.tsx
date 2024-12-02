'use client'

import CommunityCard from "./components/community-components/CommunityCard";
import useCommunityPost from "@/app/hooks/useCommunityPost"
import Link from "next/link";

export default function Home() {
  const posts = useCommunityPost()

  return (
    <div>
      {posts?.map((post, i) => { 
        return (
          <CommunityCard key={i} post={post} /> 
        )
      })}
    </div>
  );
}
