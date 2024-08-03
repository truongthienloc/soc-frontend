.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , -2048 
		addi    x15 , x0 , 165 
		sltu    x12 , x3 , x15 
		bltu    x3 , x15 , Less_i 
		bgeu    x3 , x15 , Bigger_i 
Less_i:
		ori     x22 , x3 , 122 
		sub     x27 , x15 , x3 
		srai    x27 , x27 , 0 
		and     x27 , x27 , x0 
		addi    x30 , x0 , 0 
		beq     x27 , x30 , Pass 
Bigger_i:
		ori     x22 , x3 , 71 
		sub     x27 , x15 , x3 
		srai    x27 , x27 , 2 
		and     x27 , x27 , x0 
		addi    x30 , x0 , 0 
		beq     x27 , x30 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
