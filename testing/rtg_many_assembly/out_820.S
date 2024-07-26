.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 84 
		addi    x7 , x0 , 159 
		slt     x16 , x19 , x7 
		bltu    x19 , x7 , Less_i 
		bgeu    x19 , x7 , Bigger_i 
Less_i:
		ori     x2 , x19 , 57 
		sub     x1 , x7 , x19 
		srai    x1 , x1 , 0 
		and     x1 , x1 , x0 
		addi    x12 , x0 , 0 
		beq     x1 , x12 , Pass 
Bigger_i:
		ori     x2 , x19 , 112 
		sub     x1 , x7 , x19 
		srai    x1 , x1 , 4 
		and     x1 , x1 , x0 
		addi    x12 , x0 , 0 
		beq     x1 , x12 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
