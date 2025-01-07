.text

#The program checks the ALU instruction in I_type

Main:
		addi    x2 , x0 , 118 
		addi    x21 , x0 , -2048 
		slti    x29 , x2 , 679 
		bltu    x2 , x21 , Less_i 
		bgeu    x2 , x21 , Bigger_i 
Less_i:
		ori     x28 , x2 , 31 
		sub     x18 , x21 , x2 
		srai    x18 , x18 , 1 
		and     x18 , x18 , x0 
		addi    x23 , x0 , 0 
		beq     x18 , x23 , Pass 
Bigger_i:
		ori     x28 , x2 , 195 
		sub     x18 , x21 , x2 
		srai    x18 , x18 , 3 
		and     x18 , x18 , x0 
		addi    x23 , x0 , 0 
		beq     x18 , x23 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
