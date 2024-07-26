.text

#The program checks the ALU instruction in I_type

Main:
		addi    x13 , x0 , 168 
		addi    x14 , x0 , 6 
		slt     x28 , x13 , x14 
		bltu    x13 , x14 , Less_i 
		bgeu    x13 , x14 , Bigger_i 
Less_i:
		ori     x1 , x13 , 107 
		sub     x20 , x14 , x13 
		srai    x20 , x20 , 2 
		and     x20 , x20 , x0 
		addi    x3 , x0 , 0 
		beq     x20 , x3 , Pass 
Bigger_i:
		ori     x1 , x13 , 134 
		sub     x20 , x14 , x13 
		srai    x20 , x20 , 3 
		and     x20 , x20 , x0 
		addi    x3 , x0 , 0 
		beq     x20 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
