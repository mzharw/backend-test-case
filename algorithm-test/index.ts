// NOTE : semua solusi yang saya pakai, saya coba tidak menggunakan method bawaan dari js seperti method string, array dll.
//        dengan memaksimalkan penggunaan looping, hash dan array agar lebih menyenangkan, dan juga performance-wise lebih cepat.

// Question 1 : Me-reverse string, angka terkecuali
// pada pertanyaan ini saya agak bingung dengan contoh input yang diberikan, yaitu NEGIE1
// apakah pertanyaan ini hanya untuk input yang diberikan saja? 'NEGIE1' atau termasuk kondisi dimana angka bisa saja di tengah atau di awal string
// karena itu saya putuskan untuk memberikan 2 solusi untuk pertanyaan ini
// yaitu solusi khusus untuk 'NEGIE1' dan solusi untuk case dimana posisi angka bisa dimana saja
// metode yang saya pakai dengan menggunakan looping dengan dua pointer (kiri dan kanan)
function question1(str: string): string {
    let ans: string = "";
    let left = 0; // pointer kiri
    for (let right = str.length - 1; right >= 0; right--) {
        // loop dimulai dari kanan
        if (isNaN(+str[right])) {
            // pengecekan str indeks right bukan numerik
            while (left < str.length && !isNaN(+str[left])) {
                // pengecekan indeks left yang merupakan numerik, untuk skip dan lanjut ke index selanjutnya
                // sampai indeks left bukan merupakan numerik
                left++;
            }
            // menambahkan char kedalam ans
            ans = str[left] + ans;
            left++;
        } else {
            // handler untuk indeks right yang merupakan numerik
            // menambahkan char kedalam ans
            ans = str[right] + ans;
        }
    }
    return ans;
}

// Simpler solution khusus untuk 'NEGIE1'
function question1Simple(str: string): string {
    let ans = "";
    for (let i = str.length - 2; i >= 0; i--) {
        ans += str[i];
    }

    return `${ans}${str[str.length - 1]}`;
}

console.log(question1("NEGIE1"));
console.log(question1("N3G1E1"));
console.log(question1Simple("NEGIE1"));

// Question 2 : Mencari kata dengan length terpanjang
// Solusi yang saya pakai cukup simple, saya menggunakan string temp untuk menyimpan kata sementara pada looping,
// yang mana setiap kata (ditandai dengan separator ' '), array akan ter-reset
// dan setiap sebelum reset, length current temp di compare dengan length dari current longest length ans.
// apabila temp lebih panjang dari ans, temp akan mereplace value dari ans
function question2(str: string): string {
    let ans = "",
        temp = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] != " ") temp += str[i]; // memasukan char ke string temp

        // kondisi apabila bertemu spasi (separator tiap kata) dan pengecualian untuk kata di akhir (agar tetap terbaca jika kalo tidak spasi dibelakang)
        if (str[i] == " " || i == str.length - 1) {
            if (temp.length >= ans.length) ans = temp; // replace string answer dengan temp string apabila length lebih besar sama dengan
            temp = "";
        }
    }

    return `${ans}: ${ans.length} karakter`;
}

console.log(question2("Saya sangat senang mengerjakan soal algoritma"));

// Question 3 : compare 2 array of string (query dan input)
// Solusinya cukup mudah, saya menggunakan approach dengan kompleksitas 0(n + m) yang hanya perlu loop sekali pada setiap array
// loop pertama adalah menghitung frequensi dari setiap kata yang muncul pada input dan simpan pada var freq
// Lalu loop query dan match yang sesuai dari hash freq
function question3(input: string[], query: string[]): number[] {
    let ans = [];
    let freq: { [key: string]: number } = {};

    // penghitungan frequensi kata yang muncul pada input; disimpan dalam hashmap freq
    for (let i = 0; i < input.length; i++) {
        if (freq[input[i]]) {
            freq[input[i]]++;
        } else {
            freq[input[i]] = 1;
        }
    }

    // pencocokan query dengan frequensi kata yg muncul
    for (let q = 0; q < query.length; q++) {
        ans[q] = freq[query[q]] ?? 0;
    }

    return ans;
}

console.log(question3(["xc", "dz", "bbb", "dz"], ["bbb", "ac", "dz"]));

// Question 4 : Hasil pengurangan dari penjumlahan tiap diagonal matriks NxN
// Solusinya, saya loop dengan n panjang matriks, menjumlahkan kedua diagonal, lalu saya kurangin hasil dari keduanya
// menggunakan konsep dua pointer yaitu variabel l (left) dan r (kanan)
// mendukung matriks yang bukan persegi
function question4(m: number[][]): number {
    // perbandingan panjang kolom matriks untuk mengecek apakah berbentuk persegi
    let isRect = m.length == m[0].length;
    let r = (isRect ? m.length : m[0].length) - 1;

    let d1 = 0,
        d2 = 0;

    // loop panjang baris matriks
    for (let l = 0; l < m.length; l++) {
        d1 += m[l][l];
        d2 += m[l][r];
        r--;
    }

    return d1 - d2;
}

console.log(
    question4([
        [1, 2, 0],
        [4, 5, 6],
        [7, 8, 9],
    ])
);
