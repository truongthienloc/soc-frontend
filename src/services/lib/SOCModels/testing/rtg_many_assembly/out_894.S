.text

#The program checks the ALU instruction in I_type

Main:
		addi    x23 , x0 , 105 
		addi    x17 , x0 , 40 
		sltiu   x27 , x23 , 40 
		bltu    x23 , x17 , Less_i 
		bgeu    x23 , x17 , Bigger_i 
Less_i:
		ori     x1 , x23 , 155 
		sub     x13 , x17 , x23 
		srai    x13 , x13 , 3 
		and     x13 , x13 , x0 
		addi    x24 , x0 , 0 
		beq     x13 , x24 , Pass 
Bigger_i:
		ori     x1 , x23 , 57 
		sub     x13 , x17 , x23 
		srai    x13 , x13 , 3 
		and     x13 , x13 , x0 
		addi    x24 , x0 , 0 
		beq     x13 , x24 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
