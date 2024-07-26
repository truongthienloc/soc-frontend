.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 138 
		addi    x5 , x0 , -2048 
		slti    x1 , x28 , 1 
		bltu    x28 , x5 , Less_i 
		bgeu    x28 , x5 , Bigger_i 
Less_i:
		ori     x8 , x28 , 64 
		sub     x2 , x5 , x28 
		srai    x2 , x2 , 0 
		and     x2 , x2 , x0 
		addi    x27 , x0 , 0 
		beq     x2 , x27 , Pass 
Bigger_i:
		ori     x8 , x28 , 162 
		sub     x2 , x5 , x28 
		srai    x2 , x2 , 4 
		and     x2 , x2 , x0 
		addi    x27 , x0 , 0 
		beq     x2 , x27 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
