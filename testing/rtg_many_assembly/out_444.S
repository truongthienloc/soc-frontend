.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 175 
		addi    x9 , x0 , 173 
		slt     x2 , x28 , x9 
		bltu    x28 , x9 , Less_i 
		bgeu    x28 , x9 , Bigger_i 
Less_i:
		ori     x15 , x28 , 143 
		sub     x20 , x9 , x28 
		srai    x20 , x20 , 1 
		and     x20 , x20 , x0 
		addi    x13 , x0 , 0 
		beq     x20 , x13 , Pass 
Bigger_i:
		ori     x15 , x28 , 175 
		sub     x20 , x9 , x28 
		srai    x20 , x20 , 0 
		and     x20 , x20 , x0 
		addi    x13 , x0 , 0 
		beq     x20 , x13 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
