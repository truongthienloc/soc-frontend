.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 192 
		addi    x14 , x0 , -2048 
		slti    x8 , x18 , 765 
		bltu    x18 , x14 , Less_i 
		bgeu    x18 , x14 , Bigger_i 
Less_i:
		ori     x13 , x18 , 150 
		sub     x5 , x14 , x18 
		srai    x5 , x5 , 0 
		and     x5 , x5 , x0 
		addi    x25 , x0 , 0 
		beq     x5 , x25 , Pass 
Bigger_i:
		ori     x13 , x18 , 116 
		sub     x5 , x14 , x18 
		srai    x5 , x5 , 4 
		and     x5 , x5 , x0 
		addi    x25 , x0 , 0 
		beq     x5 , x25 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
