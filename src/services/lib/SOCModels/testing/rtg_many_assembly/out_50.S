.text

#The program checks the ALU instruction in I_type

Main:
		addi    x23 , x0 , 171 
		addi    x25 , x0 , 189 
		slt     x22 , x23 , x25 
		bltu    x23 , x25 , Less_i 
		bgeu    x23 , x25 , Bigger_i 
Less_i:
		ori     x27 , x23 , 179 
		sub     x7 , x25 , x23 
		srai    x7 , x7 , 3 
		and     x7 , x7 , x0 
		addi    x15 , x0 , 0 
		beq     x7 , x15 , Pass 
Bigger_i:
		ori     x27 , x23 , 46 
		sub     x7 , x25 , x23 
		srai    x7 , x7 , 1 
		and     x7 , x7 , x0 
		addi    x15 , x0 , 0 
		beq     x7 , x15 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
