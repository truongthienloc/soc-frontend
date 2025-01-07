.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , -2048 
		addi    x17 , x0 , 153 
		sltu    x3 , x6 , x17 
		bltu    x6 , x17 , Less_i 
		bgeu    x6 , x17 , Bigger_i 
Less_i:
		ori     x27 , x6 , 136 
		sub     x4 , x17 , x6 
		srai    x4 , x4 , 3 
		and     x4 , x4 , x0 
		addi    x15 , x0 , 0 
		beq     x4 , x15 , Pass 
Bigger_i:
		ori     x27 , x6 , 129 
		sub     x4 , x17 , x6 
		srai    x4 , x4 , 4 
		and     x4 , x4 , x0 
		addi    x15 , x0 , 0 
		beq     x4 , x15 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
