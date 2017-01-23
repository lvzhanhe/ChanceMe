using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;

namespace ParseUniv {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Downloading mega list ...");
            string raw = (new WebClient()).DownloadString("http://www.collegesimply.com/search/?view=all");
            Console.WriteLine("Preparing mega list ...");
            string tbody = Regex.Match(raw, @"<tbody>(.*?)</tbody>", RegexOptions.Singleline).Groups[1].Value;
            MatchCollection trs = Regex.Matches(tbody, @"<tr>(.*?)</tr>", RegexOptions.Singleline);
            List<SchoolData> schools = new List<SchoolData>();
            int i = 0;
            foreach (Match tr in trs) {
                Console.WriteLine("Parsing school " + ++i);
                string td = Regex.Match(tr.Groups[1].Value, @"<td>(.*?)</td>", RegexOptions.Singleline).Groups[1].Value;
                string span = Regex.Match(td, @"<span.*?>(.*?)</span>", RegexOptions.Singleline).Groups[1].Value;
                MatchCollection values = Regex.Matches(span, @": (.*?)[ <]+", RegexOptions.Singleline);
                string _sat = values[0].Groups[1].Value;
                string _act = values[1].Groups[1].Value;
                string gpa = values[2].Groups[1].Value;
                string[] sat = _sat.Split('-');
                string[] act = _act.Split('-');
                if (sat[0] == "" || sat[1] == "" || act[0] == "" || act[1] == "") { continue; }
                string name = Regex.Match(td, @"<a.*?>(.*?)</a>", RegexOptions.Singleline).Groups[1].Value;
                string ad_raw = (new WebClient()).DownloadString(@"http://www.acceptancerate.com/search?query=" + name);
                string a = Regex.Match(ad_raw, @"([0-9]*\.[0-9]*%)", RegexOptions.Singleline).Groups[1].Value;
                string address = Regex.Match(ad_raw, "address\">(.*?)<\\/span>", RegexOptions.Singleline).Groups[1].Value;
                if (string.IsNullOrWhiteSpace(a)) { continue; }
                if (!double.TryParse(gpa, out double q)) {
                    string _gpa = Regex.Match(ad_raw, "data-gpa=\"([0-9.]*)", RegexOptions.Singleline).Groups[1].Value;
                    if (double.TryParse(_gpa, out double qq)) { gpa = _gpa; }
                }
                SchoolData temp = new SchoolData() {
                    NAME = name,
                    SAT_25 = sat[0],
                    SAT_75 = sat[1],
                    ACT_25 = act[0],
                    ACT_75 = act[1],
                    GPA = gpa,
                    ADMISSION = a,
                    ADDRESS = address
                };
                schools.Add(temp);
                Console.WriteLine(temp);
            }
            Console.WriteLine("Sorting list ...");
            schools.Sort((x, y) => x.NAME.CompareTo(y.NAME));
            Console.WriteLine("Creating JSON object ...");
            string json = (new JavaScriptSerializer()).Serialize(schools);
            File.WriteAllText("data.json", json);
            Console.WriteLine(Environment.NewLine + "DONE");
            Console.ReadKey();
        }
    }

    class SchoolData {
        public string NAME { get; set; }
        public string SAT_25 { get; set; }
        public string SAT_75 { get; set; }
        public string ACT_25 { get; set; }
        public string ACT_75 { get; set; }
        public string GPA { get; set; }
        public string ADMISSION { get; set; }
        public string ADDRESS { get; set; }
        public override string ToString() {
            return "NAME: " + NAME + Environment.NewLine
                + "SAT_25: " + SAT_25 + Environment.NewLine
                + "SAT_75: " + SAT_75 + Environment.NewLine
                + "ACT_25: " + ACT_25 + Environment.NewLine
                + "ACT_75: " + ACT_75 + Environment.NewLine
                + "GPA: " + GPA + Environment.NewLine
                + "ADMISSION: " + ADMISSION + Environment.NewLine
                + "ADDRESS: " + ADDRESS + Environment.NewLine;
        }
    }
}
