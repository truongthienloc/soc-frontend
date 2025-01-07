.text

#The program checks the ALU instruction in I_type

Main:
		addi    x17 , x0 , 169 
		addi    x21 , x0 , 168 
		sltu    x23 , x17 , x21 
		bltu    x17 , x21 , Less_i 
		bgeu    x17 , x21 , Bigger_i 
Less_i:
		ori     x13 , x17 , 11 
		sub     x30 , x21 , x17 
		srai    x30 , x30 , 4 
		and     x30 , x30 , x0 
		addi    x20 , x0 , 0 
		beq     x30 , x20 , Pass 
Bigger_i:
		ori     x13 , x17 , 38 
		sub     x30 , x21 , x17 
		srai    x30 , x30 , 0 
		and     x30 , x30 , x0 
		addi    x20 , x0 , 0 
		beq     x30 , x20 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
