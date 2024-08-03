.text

#The program checks the ALU instruction in I_type

Main:
		addi    x4 , x0 , 107 
		addi    x18 , x0 , -2048 
		slti    x12 , x4 , 907 
		bltu    x4 , x18 , Less_i 
		bgeu    x4 , x18 , Bigger_i 
Less_i:
		ori     x27 , x4 , 36 
		sub     x1 , x18 , x4 
		srai    x1 , x1 , 2 
		and     x1 , x1 , x0 
		addi    x10 , x0 , 0 
		beq     x1 , x10 , Pass 
Bigger_i:
		ori     x27 , x4 , 28 
		sub     x1 , x18 , x4 
		srai    x1 , x1 , 1 
		and     x1 , x1 , x0 
		addi    x10 , x0 , 0 
		beq     x1 , x10 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
