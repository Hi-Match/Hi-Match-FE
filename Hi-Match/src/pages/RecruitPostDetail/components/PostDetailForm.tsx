import PostDetail from "./PostDetail";
import CoverLetterList from "./CoverLetterList";

interface PostDetailFormProps {
    recruitPost: RecruitPostInfo;
    postingQuestion: PostingQuestion[];
}

const PostDetailForm = ({
    recruitPost,
    postingQuestion,
}: PostDetailFormProps) => {
    return (
        <div className="recruit_post_detail grid w-full grid-cols-1 gap-7.5 pb-50 xl:grid-cols-3 xl:pb-25">
            <div className="xl:col-span-2">
                <PostDetail recruitPost={recruitPost} />
            </div>
            <div className="xl:col-span-1">
                <CoverLetterList postingQuestion={postingQuestion} />
            </div>
        </div>
    );
};

export default PostDetailForm;
