const form = document.getElementById("formPendaftaran");
const nameInput = document.getElementById("name");
const jurusanInput = document.getElementById("jurusan");
const eskulInput = document.getElementById("eskul");
const dataSiswa = document.getElementById("dataSiswa");
const btnTambah = document.getElementById("btnTambah");

let data = [];
let editIndex = -1;

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const nama = nameInput.value;
    const kelas = document.querySelector(
        'input[name="kelas"]:checked'
    );

    if (nama === "" || kelas === null) {
        alert("Nama dan kelas harus diisi!");
        return;
    }

    const siswa = {
        nama: nama,
        kelas: kelas.value,
        jurusan: jurusanInput.value,
        eskul: eskulInput.value
    };


    if (editIndex !== -1) {

        data[editIndex] = siswa;

        alert("Data berhasil di edit!");

        editIndex = -1;
        btnTambah.textContent = "Tambah Data";

    } else {

        // Tambah data baru
        data.push(siswa);

        alert("Data berhasil ditambah!");

    }

    tampilkanData();

    form.reset();
});

function tampilkanData() {

    dataSiswa.innerHTML = "";

    data.forEach(function (siswa, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${siswa.nama}</td>
            <td>${siswa.kelas}</td>
            <td>${siswa.jurusan}</td>
            <td>${siswa.eskul}</td>

            <td>
                <button 
                    class="btn-edit"
                    onclick="editData(${index})">
                    Edit
                </button>

                <button 
                    class="btn-delete"
                    onclick="hapusData(${index})">
                    Delete
                </button>
            </td>
        `;

        dataSiswa.appendChild(row);
    });
}

function editData(index) {

    const siswa = data[index];

    nameInput.value = siswa.nama;

    document.querySelector(
        `input[name="kelas"][value="${siswa.kelas}"]`
    ).checked = true;

    jurusanInput.value = siswa.jurusan;
    eskulInput.value = siswa.eskul;

    editIndex = index;

    btnTambah.textContent = "Edit Data";
}

function hapusData(index) {

    data.splice(index, 1);

    alert("Data berhasil di hapus!");

    tampilkanData();
}