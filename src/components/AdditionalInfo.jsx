import paragraphImageOne from "../../public/heroSection.webp";
import paragraphImageTwo from "../../public/fast256.png";

function AdditionalInfo() {
  return (
    <div>
      {/* first paragraph */}
      <div className="my-10 animate-formLeft">
        <div className="flex flex-col items-center lg:flex-row m gap-5">
          <img
            className="w-[350px] h-[300px] mx-auto md:relative md:left-[56px]"
            src={paragraphImageOne}
            alt="decreption image"
          />
          <div>
            <h2 className="text-Mymain font-bold text-4xl mb-5">
              <span className="text-black"> جودة </span>الطعام
            </h2>
            <p className="text-lg leading-relaxed max-w-200">
              في "سر اللفة"، نضع الجودة والنظافة في صميم كل ما نقدمه، إيمانًا
              منا بأنهما أساس التجربة الغذائية الممتازة. تبدأ رحلة أطباقنا
              باختيار دقيق لأجود المكونات الطازجة من مصادر موثوقة، حيث نولي
              اهتمامًا بالغًا بانتقاء الخضروات الموسمية، والأعشاب العطرية،
              والمواد الأولية التي تضمن أعلى مستويات الجودة والمذاق الرفيع
            </p>
          </div>
        </div>
      </div>
      {/* second paragraph */}
      <div className="my-15 animate-formLeft">
        <div className="flex flex-col-reverse items-center lg:flex-row m gap-5">
          <div>
            <h2 className="text-Mymain font-bold text-4xl mb-5">
              <span className="text-black"> سرعة </span>التوصيل
            </h2>
            <p className="text-lg leading-relaxed max-w-200">
              في "سر اللفة"، ندرك تمامًا أن جودة التجربة لا تقتصر على مذاق
              الطعام فحسب، بل تمتد لتشمل طريقة وصوله إليكم. لذا، نولي اهتمامًا
              بالغًا لعملية التغليف، حيث نعتبرها جزءًا لا يتجزأ من الحفاظ على
              جودة أطباقنا وتقديمها بأفضل صورة نولي أهمية قصوى لسرعة التوصيل،
              إيمانًا منا بأن الوقت هو عنصر حاسم عندما يتعلق الأمر بالاستمتاع
              بوجبة شهية. لقد حرصنا على تطوير نظام توصيل فعال وسريع يغطي أنحاء
              مدينة الرياض، مما يضمن وصول طلباتكم في أسرع وقت ممكن.
            </p>
          </div>
          <img src={paragraphImageTwo} className="w-[320px]" alt="" />
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
