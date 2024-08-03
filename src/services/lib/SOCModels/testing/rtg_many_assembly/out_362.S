.text

#The program checks the ALU instruction in I_type

Main:
		addi    x11 , x0 , 57 
		addi    x17 , x0 , 138 
		addi    x14 , x0 , 150 
		bltu    x11 , x17 , Less_i 
		bgeu    x11 , x17 , Bigger_i 
Less_i:
		addi    x7 , x14 , 163 
		andi    x4 , x14 , 94 
		add     x4 , x4 , x7 
		srli    x4 , x4 , 0 
		addi    x13 , x0 , 335 
		bne     x4 , x13 , Fail 
Bigger_i:
		ori     x7 , x14 , 81 
		xori    x4 , x14 , 64 
		add     x4 , x4 , x7 
		srai    x4 , x4 , 0 
		addi    x13 , x0 , 429 
		bne     x4 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
