.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , -2048 
		addi    x25 , x0 , 170 
		sltu    x30 , x27 , x25 
		bltu    x27 , x25 , Less_i 
		bgeu    x27 , x25 , Bigger_i 
Less_i:
		ori     x17 , x27 , 112 
		sub     x31 , x25 , x27 
		srai    x31 , x31 , 4 
		and     x31 , x31 , x0 
		addi    x8 , x0 , 0 
		beq     x31 , x8 , Pass 
Bigger_i:
		ori     x17 , x27 , 111 
		sub     x31 , x25 , x27 
		srai    x31 , x31 , 2 
		and     x31 , x31 , x0 
		addi    x8 , x0 , 0 
		beq     x31 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
