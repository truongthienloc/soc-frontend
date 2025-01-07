.text

#The program checks the ALU instruction in I_type

Main:
		addi    x20 , x0 , 37 
		addi    x27 , x0 , 39 
		slt     x12 , x20 , x27 
		bltu    x20 , x27 , Less_i 
		bgeu    x20 , x27 , Bigger_i 
Less_i:
		ori     x8 , x20 , 65 
		sub     x24 , x27 , x20 
		srai    x24 , x24 , 2 
		and     x24 , x24 , x0 
		addi    x2 , x0 , 0 
		beq     x24 , x2 , Pass 
Bigger_i:
		ori     x8 , x20 , 23 
		sub     x24 , x27 , x20 
		srai    x24 , x24 , 3 
		and     x24 , x24 , x0 
		addi    x2 , x0 , 0 
		beq     x24 , x2 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
