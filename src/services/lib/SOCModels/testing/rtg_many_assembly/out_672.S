.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 60 
		addi    x26 , x0 , -2048 
		slti    x21 , x15 , 84 
		bltu    x15 , x26 , Less_i 
		bgeu    x15 , x26 , Bigger_i 
Less_i:
		ori     x5 , x15 , 61 
		sub     x28 , x26 , x15 
		srai    x28 , x28 , 1 
		and     x28 , x28 , x0 
		addi    x1 , x0 , 0 
		beq     x28 , x1 , Pass 
Bigger_i:
		ori     x5 , x15 , 128 
		sub     x28 , x26 , x15 
		srai    x28 , x28 , 2 
		and     x28 , x28 , x0 
		addi    x1 , x0 , 0 
		beq     x28 , x1 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
