.text

#The program checks the ALU instruction in I_type

Main:
		addi    x1 , x0 , 10 
		addi    x13 , x0 , 167 
		slt     x5 , x1 , x13 
		bltu    x1 , x13 , Less_i 
		bgeu    x1 , x13 , Bigger_i 
Less_i:
		ori     x23 , x1 , 149 
		sub     x12 , x13 , x1 
		srai    x12 , x12 , 1 
		and     x12 , x12 , x0 
		addi    x9 , x0 , 0 
		beq     x12 , x9 , Pass 
Bigger_i:
		ori     x23 , x1 , 154 
		sub     x12 , x13 , x1 
		srai    x12 , x12 , 3 
		and     x12 , x12 , x0 
		addi    x9 , x0 , 0 
		beq     x12 , x9 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
