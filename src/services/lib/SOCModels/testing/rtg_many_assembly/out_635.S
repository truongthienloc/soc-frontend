.text

#The program checks the ALU instruction in I_type

Main:
		addi    x21 , x0 , 3 
		addi    x12 , x0 , 186 
		slt     x8 , x21 , x12 
		bltu    x21 , x12 , Less_i 
		bgeu    x21 , x12 , Bigger_i 
Less_i:
		ori     x1 , x21 , 101 
		sub     x14 , x12 , x21 
		srai    x14 , x14 , 4 
		and     x14 , x14 , x0 
		addi    x3 , x0 , 0 
		beq     x14 , x3 , Pass 
Bigger_i:
		ori     x1 , x21 , 126 
		sub     x14 , x12 , x21 
		srai    x14 , x14 , 4 
		and     x14 , x14 , x0 
		addi    x3 , x0 , 0 
		beq     x14 , x3 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
