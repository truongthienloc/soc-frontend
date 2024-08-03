.text

#The program checks the ALU instruction in I_type

Main:
		addi    x20 , x0 , 0 
		addi    x19 , x0 , -1 
		sltu    x3 , x20 , x19 
		bltu    x20 , x19 , Less_i 
		bgeu    x20 , x19 , Bigger_i 
Less_i:
		ori     x26 , x20 , 147 
		sub     x13 , x19 , x20 
		srai    x13 , x13 , 3 
		and     x13 , x13 , x0 
		addi    x21 , x0 , 0 
		beq     x13 , x21 , Pass 
Bigger_i:
		ori     x26 , x20 , 139 
		sub     x13 , x19 , x20 
		srai    x13 , x13 , 3 
		and     x13 , x13 , x0 
		addi    x21 , x0 , 0 
		beq     x13 , x21 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
