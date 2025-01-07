.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 63 
		addi    x23 , x0 , 171 
		slt     x3 , x12 , x23 
		bltu    x12 , x23 , Less_i 
		bgeu    x12 , x23 , Bigger_i 
Less_i:
		ori     x21 , x12 , 34 
		sub     x26 , x23 , x12 
		srai    x26 , x26 , 3 
		and     x26 , x26 , x0 
		addi    x19 , x0 , 0 
		beq     x26 , x19 , Pass 
Bigger_i:
		ori     x21 , x12 , 120 
		sub     x26 , x23 , x12 
		srai    x26 , x26 , 1 
		and     x26 , x26 , x0 
		addi    x19 , x0 , 0 
		beq     x26 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
