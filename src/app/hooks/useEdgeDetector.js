import { useState, useEffect } from "react"

const useEdgeDetector = () => {
    const [isEdge, setIsEdge] = useState(0)
    
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        // 페이지 하단에 도달했는지 확인
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          setIsEdge(prev => prev + 5);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        // 컴포넌트 언마운트 시 이벤트 제거
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isEdge
}

export default useEdgeDetector