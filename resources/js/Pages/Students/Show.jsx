                        {/* Tampilkan Foto Profil jika ada */}
                        {student.foto_profil && (
                            <div className="md:col-span-2 flex justify-center md:justify-start">
                                {/* flex: gunakan flexbox untuk menata konten di dalamnya */}
                                {/* justify-center: tengahkan konten secara horizontal di mobile */}
                                {/* md:justify-start: geser konten ke kiri di layar >= medium */}
                                <div> {/* Wrapper tambahan jika perlu menata label dan gambar bersamaan */}
                                    <strong>Foto Profil:</strong>
                                    {/* Tag <img> untuk menampilkan gambar */}
                                    <img src={student.foto_profil} alt="Foto Profil" className="w-32 h-32 rounded-full" />
                                </div>
                            </div>
                        )}