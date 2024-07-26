.text

#The program checks the ALU instruction in I_type

Main:
		addi    x1 , x0 , -2048 
		addi    x27 , x0 , 24 
		sltu    x12 , x1 , x27 
		bltu    x1 , x27 , Less_i 
		bgeu    x1 , x27 , Bigger_i 
Less_i:
		ori     x16 , x1 , 32 
		sub     x6 , x27 , x1 
		srai    x6 , x6 , 3 
		and     x6 , x6 , x0 
		addi    x21 , x0 , 0 
		beq     x6 , x21 , Pass 
Bigger_i:
		ori     x16 , x1 , 24 
		sub     x6 , x27 , x1 
		srai    x6 , x6 , 0 
		and     x6 , x6 , x0 
		addi    x21 , x0 , 0 
		beq     x6 , x21 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
