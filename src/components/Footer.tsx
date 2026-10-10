
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* left side */}
                <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-400">
                        বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে ।
                    </p>
                </div>

                {/* Right side */}
                <p className="text-sm text-gray-400 text-center md:text-right max-w-md">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নি র্ভর করে পরি বর্তি ত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;