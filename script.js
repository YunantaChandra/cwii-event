// Fungsi utama untuk mengambil data dari events.json dan merendernya ke HTML
async function loadEvents() {
    try {
        // Mengambil data dari events.json dengan parameter anti-cache
        const response = await fetch('events.json?nocache=' + Date.now(), {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        
        const events = await response.json();

        // Menangkap elemen wadah di HTML
        const ongoingContainer = document.getElementById('ongoing-events');
        const closedContainer = document.getElementById('closed-events');

        ongoingContainer.innerHTML = '';
        closedContainer.innerHTML = '';

        // Looping data event dari JSON
        events.forEach(event => {
            if (event.status === 'active') {
                ongoingContainer.innerHTML += `
                    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-emerald-200 overflow-hidden flex flex-col justify-between">
                        <div class="p-5">
                            <div class="flex justify-between items-start mb-2">
                                <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md">
                                    <i class="fa-solid fa-lock-open mr-1"></i> Pendaftaran Dibuka
                                </span>
                                <span class="text-xs text-slate-400">${event.date}</span>
                            </div>
                            <h4 class="font-bold text-slate-800 text-base mb-1">${event.title}</h4>
                            <p class="text-xs text-slate-600 mb-4 line-clamp-2">${event.description}</p>
                            
                            <div class="text-xs text-slate-500 space-y-1 mb-4">
                                <p><i class="fa-regular fa-clock w-4 text-slate-400"></i> Batas: <strong>${event.deadline}</strong></p>
                                <p><i class="fa-solid fa-user-group w-4 text-slate-400"></i> ${event.quota}</p>
                            </div>
                        </div>
                        
                        <div class="p-4 bg-slate-50 border-t border-slate-100">
                            <a href="${event.link}" target="_blank" 
                               class="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition duration-150 text-sm">
                                Buka Form Pendaftaran <i class="fa-solid fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    </div>
                `;
            } else {
                closedContainer.innerHTML += `
                    <div class="bg-white rounded-xl border border-slate-200 opacity-75 overflow-hidden flex flex-col justify-between">
                        <div class="p-5">
                            <div class="flex justify-between items-start mb-2">
                                <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">
                                    <i class="fa-solid fa-lock mr-1"></i> Ditutup
                                </span>
                                <span class="text-xs text-slate-400">${event.date}</span>
                            </div>
                            <h4 class="font-bold text-slate-700 text-base mb-1">${event.title}</h4>
                            <p class="text-xs text-slate-500 mb-3">${event.description}</p>
                            
                            <div class="text-xs text-slate-400 space-y-1 mb-4 border-t border-slate-100 pt-2">
                                <p><i class="fa-regular fa-clock w-4 text-slate-400"></i> Batas: <strong>${event.deadline}</strong></p>
                                <p><i class="fa-solid fa-user-group w-4 text-slate-400"></i> ${event.quota}</p>
                            </div>
                        </div>
                        
                        <div class="p-4 bg-slate-50 border-t border-slate-100">
                            <button disabled class="w-full text-center bg-slate-200 text-slate-500 font-medium py-2 px-4 rounded-lg cursor-not-allowed text-sm">
                                Pendaftaran Ditutup
                            </button>
                        </div>
                    </div>
                `;
            }
        });

    } catch (error) {
        console.error('Gagal memuat data event:', error);
    }
}

// Jalankan fungsi saat script dimuat
loadEvents();
