.text

#The program finds the value of fibonacci 

Fibo:
		addi    x11 , x0 , 11 
		addi    x14 , x0 , 1 
		addi    x24 , x0 , 1 
		addi    x20 , x0 , 3 
		beq     x11 , x0 , Result0 
		beq     x11 , x24 , Result1 
Loop: 
		blt     x11 , x20 , Result 
		add     x16 , x14 , x24 
		addi    x14 , x24 , 0 
		addi    x24 , x16 , 0 
		addi    x20 , x20 , 1 
		jal     x0 , Loop 
Result0:
		addi    x16 , x0 , 0 
		addi    x4 , x0 , 0 
		bne     x16 , x4 , Fail 
Result1:
		addi    x16 , x0 , 1 
		addi    x17 , x0 , 1 
		bne     x16 , x17 , Fail 
Result:
		addi    x18 , x0 , 89 
		bne     x16 , x18 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
