.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , -2048 
		addi    x6 , x0 , 141 
		sltu    x8 , x27 , x6 
		bltu    x27 , x6 , Less_i 
		bgeu    x27 , x6 , Bigger_i 
Less_i:
		ori     x15 , x27 , 125 
		sub     x12 , x6 , x27 
		srai    x12 , x12 , 4 
		and     x12 , x12 , x0 
		addi    x30 , x0 , 0 
		beq     x12 , x30 , Pass 
Bigger_i:
		ori     x15 , x27 , 193 
		sub     x12 , x6 , x27 
		srai    x12 , x12 , 4 
		and     x12 , x12 , x0 
		addi    x30 , x0 , 0 
		beq     x12 , x30 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
