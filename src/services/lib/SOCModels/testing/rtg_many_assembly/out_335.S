.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 146 
		addi    x2 , x0 , 60 
		slt     x19 , x12 , x2 
		bltu    x12 , x2 , Less_i 
		bgeu    x12 , x2 , Bigger_i 
Less_i:
		ori     x15 , x12 , 43 
		sub     x30 , x2 , x12 
		srai    x30 , x30 , 2 
		and     x30 , x30 , x0 
		addi    x3 , x0 , 0 
		beq     x30 , x3 , Pass 
Bigger_i:
		ori     x15 , x12 , 160 
		sub     x30 , x2 , x12 
		srai    x30 , x30 , 4 
		and     x30 , x30 , x0 
		addi    x3 , x0 , 0 
		beq     x30 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
